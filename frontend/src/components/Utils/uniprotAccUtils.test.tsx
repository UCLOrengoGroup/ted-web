import { render } from '@testing-library/react';
import { expect, test } from 'vitest'
import { render_cath_label, get_cath_sfam_url } from './uniprotAccUtils.tsx'
import { throws } from "assert"

import { Link } from "@chakra-ui/react"
import { ExternalLinkIcon } from "@chakra-ui/icons"

const CATH_BASE_URL = 'https://www.cathdb.info/'

test('get_cath_sfam_url_blank', () => {
  throws(() => get_cath_sfam_url('-'), { name: 'Error', message: 'CATH ID is blank' })
})

test('get_cath_sfam_url_id', () => {
  const cath_id = '1.10.8.10'
  const expected = `${CATH_BASE_URL}/version/latest/superfamily/${cath_id}`
  expect(get_cath_sfam_url(cath_id)).toBe(expected)
})


test('render_cath_label_single_label', () => {
  const cath_label = '1.10.8.10'
  const expected = render(
  <>
    <Link href={`${CATH_BASE_URL}/version/latest/superfamily/${cath_label}`} isExternal>
      {cath_label} <ExternalLinkIcon mx={"2px"}/>
    </Link>
  </>
  );
  const got = render(render_cath_label(cath_label))

  expect(JSON.stringify(got.container.innerHTML, null, 2))
    .toEqual(JSON.stringify(expected.container.innerHTML, null, 2));
})

test('render_cath_label_single_label', () => {
  const cath_label = '1.10.8.10,2.40.60.10'
  const expected = render(
  <>
    { cath_label.split(",").map((cath_id) => {
      return <Link href={`${CATH_BASE_URL}/version/latest/superfamily/${cath_id}`} isExternal>
        {cath_id} <ExternalLinkIcon mx={"2px"}/>
      </Link>
    })}
  </>
  );
  const got = render(render_cath_label(cath_label))

  expect(JSON.stringify(got.container.innerHTML, null, 2))
    .toEqual(JSON.stringify(expected.container.innerHTML, null, 2));
})