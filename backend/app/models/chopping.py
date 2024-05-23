import re

from pydantic import BaseModel

SEGMENT_PDB_RES_LABEL_RE = re.compile(r"(?P<start>-?\d+[A-Z]?)-(?P<stop>-?\d+[A-Z]?)$")
SEGMENT_NUM_RE = re.compile(r"(?P<start>\d+)-(?P<stop>\d+)$")


class SegmentResLabel(BaseModel):
    start: str
    stop: str


class SegmentNum(BaseModel):
    start: int
    stop: int


class ChoppingBase(BaseModel):
    domain_id: str
    segments: list[SegmentNum] | list[SegmentResLabel]

    @classmethod
    def from_chopping_str(cls, domain_id: str, chopping_str: str) -> "ChoppingBase":
        seg_strs = chopping_str.split("_")

        segments = []
        for seg_str in seg_strs:

            seg_re = None
            seg_class = None
            seg_cast = None
            if issubclass(cls, ChoppingResLabel):
                seg_re = SEGMENT_PDB_RES_LABEL_RE
                seg_class = SegmentResLabel
                seg_cast = str
            elif issubclass(cls, ChoppingNumeric):
                seg_re = SEGMENT_NUM_RE
                seg_class = SegmentNum
                seg_cast = int
            else:
                raise ValueError(f"Unrecognized ChoppingBase subclass: {cls}")

            m = seg_re.match(seg_str)
            if m is None:
                raise ValueError(
                    f"Invalid segment string: {seg_str} (did not match {seg_re})"
                )
            seg = seg_class(
                start=seg_cast(m.group("start")),
                stop=seg_cast(m.group("stop")),
            )
            segments.append(seg)

        return cls(domain_id=domain_id, segments=segments)

    def get_first_res(self) -> int | str:
        return self.segments[0].start

    def get_last_res(self) -> int | str:
        return self.segments[-1].stop

    def to_str(self) -> str:
        return "_".join([f"{seg.start}-{seg.stop}" for seg in self.segments])

    def count_residues(self) -> int:
        return sum([seg.stop - seg.start + 1 for seg in self.segments])

    def to_selres_str(self) -> str:
        return ",".join([f"{seg.start}:{seg.stop}" for seg in self.segments])


class ChoppingResLabel(ChoppingBase):
    segments: list[SegmentResLabel]

    def count_residues(self) -> None:
        raise NotImplementedError(
            "Cannot get residue count from PDB residue labels (without more jiggery pokery)"
        )


class ChoppingNumeric(ChoppingBase):
    segments: list[SegmentNum]
