import { throws } from "node:assert"
import { render } from "@testing-library/react"
import { expect, test } from "vitest"
import { get_cath_cathnode_url, render_cath_label } from "./uniprotAccUtils.tsx"

import { ExternalLinkIcon } from "@chakra-ui/icons"
import { Link } from "@chakra-ui/react"

const CATH_BASE_URL = "https://www.cathdb.info/"

test("get_cath_cathnode_url_blank", () => {
  throws(() => get_cath_cathnode_url("-"), {
    name: "Error",
    message: "CATH ID is blank",
  })
})

test("get_cath_cathnode_url_id", () => {
  const cath_id = "1.10.8.10"
  const expected = `${CATH_BASE_URL}/version/latest/cathnode/${cath_id}`
  expect(get_cath_cathnode_url(cath_id)).toBe(expected)
})

test("render_cath_label_single_label", () => {
  const cath_label = "1.10.8.10"
  const expected = render(
    <>
      <Link
        href={`${CATH_BASE_URL}/version/latest/cathnode/${cath_label}`}
        isExternal
      >
        {cath_label} <ExternalLinkIcon mx={"2px"} />
      </Link>
    </>,
  )
  const got = render(render_cath_label(cath_label))

  expect(JSON.stringify(got.container.innerHTML, null, 2)).toEqual(
    JSON.stringify(expected.container.innerHTML, null, 2),
  )
})

test("render_cath_label_single_label", () => {
  const cath_label = "1.10.8.10,2.40.60.10"
  const expected = render(
    <>
      {[cath_label.split(",")[0]].map((cath_id) => {
        return (
          <Link
            href={`${CATH_BASE_URL}/version/latest/cathnode/${cath_id}`}
            isExternal
          >
            {cath_id} <ExternalLinkIcon mx={"2px"} />
          </Link>
        )
      })}
    </>,
  )
  const got = render(render_cath_label(cath_label))

  expect(JSON.stringify(got.container.innerHTML, null, 2)).toEqual(
    JSON.stringify(expected.container.innerHTML, null, 2),
  )
})
