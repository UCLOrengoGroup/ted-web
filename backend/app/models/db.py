from sqlmodel import Field, Relationship, SQLModel

from .utils import ted_id_to_af_id


# Shared properties
# TODO replace email str with EmailStr when sqlmodel supports it
class UserBase(SQLModel):
    email: str = Field(unique=True, index=True)
    is_active: bool = True
    is_superuser: bool = False
    full_name: str | None = None


# Properties to receive via API on creation
class UserCreate(UserBase):
    password: str


# TODO replace email str with EmailStr when sqlmodel supports it
class UserCreateOpen(SQLModel):
    email: str
    password: str
    full_name: str | None = None


# Properties to receive via API on update, all are optional
# TODO replace email str with EmailStr when sqlmodel supports it
class UserUpdate(UserBase):
    email: str | None = None
    password: str | None = None


# TODO replace email str with EmailStr when sqlmodel supports it
class UserUpdateMe(SQLModel):
    full_name: str | None = None
    email: str | None = None


class UpdatePassword(SQLModel):
    current_password: str
    new_password: str


# Database model, database table inferred from class name
class User(UserBase, table=True):
    id: int | None = Field(default=None, primary_key=True)
    hashed_password: str
    items: list["Item"] = Relationship(back_populates="owner")


# Properties to return via API, id is always required
class UserOut(UserBase):
    id: int


class UsersOut(SQLModel):
    data: list[UserOut]
    count: int


# Shared properties
class ItemBase(SQLModel):
    title: str
    description: str | None = None


# Properties to receive on item creation
class ItemCreate(ItemBase):
    title: str


# Properties to receive on item update
class ItemUpdate(ItemBase):
    title: str | None = None


# Database model, database table inferred from class name
class Item(ItemBase, table=True):
    id: int | None = Field(default=None, primary_key=True)
    title: str
    owner_id: int | None = Field(default=None, foreign_key="user.id", nullable=False)
    owner: User | None = Relationship(back_populates="items")


# Properties to return via API, id is always required
class ItemOut(ItemBase):
    id: int
    owner_id: int


class ItemsOut(SQLModel):
    data: list[ItemOut]
    count: int


# Generic message
class Message(SQLModel):
    message: str


# JSON payload containing access token
class Token(SQLModel):
    access_token: str
    token_type: str = "bearer"


# Contents of JWT token
class TokenPayload(SQLModel):
    sub: int | None = None


class NewPassword(SQLModel):
    token: str
    new_password: str


class DomainSummary(SQLModel, table=True):
    ted_id: str = Field(nullable=False, primary_key=True)
    uniprot_acc: str = Field(nullable=False, index=True)
    md5_domain: str = Field(nullable=False, index=True)
    consensus_level: str = Field(nullable=False, index=True)
    chopping: str = Field(nullable=False)
    nres_domain: int = Field(nullable=False)
    num_segments: int = Field(nullable=False)
    plddt: float = Field(nullable=False)
    num_helix_strand_turn: int = Field(nullable=False)
    num_helix: int = Field(nullable=False)
    num_strand: int = Field(nullable=False)
    num_helix_strand: int = Field(nullable=False)
    num_turn: int = Field(nullable=False)
    proteome_id: int = Field(nullable=False, index=True)
    cath_label: str = Field(nullable=False)
    cath_assignment_level: str = Field(nullable=False)
    cath_assignment_method: str = Field(nullable=False)
    packing_density: float = Field(nullable=False)
    norm_rg: float = Field(nullable=False)
    tax_common_name: str = Field(nullable=False)
    tax_scientific_name: str = Field(nullable=False, index=True)
    tax_lineage: str = Field(nullable=False)

    @property
    def af_id(self):
        return ted_id_to_af_id(self.ted_id)
