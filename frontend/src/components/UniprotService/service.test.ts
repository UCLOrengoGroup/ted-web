import { expect, test } from 'vitest'

import { convertUniprotWebToModel } from './service'

import data_Q8N3R3 from './service.test.Q8N3R3.json'
import data_A0A001 from './service.test.A0A001.json'

test('gets correct UniProt name from A0A001', () => {
    const up_data = convertUniprotWebToModel(data_A0A001)
    expect(up_data.accession).toBe('A0A001')
    expect(up_data.id).toBe('A0A001_STRVD')
    expect(up_data.proteinDescription.fullName).toBe('MoeD5')
})

test('gets correct UniProt name from Q8N3R3', () => {
    const up_data = convertUniprotWebToModel(data_Q8N3R3)
    expect(up_data.accession).toBe('Q8N3R3')
    expect(up_data.id).toBe('TCAIM_HUMAN')
    expect(up_data.proteinDescription.fullName).toBe('T-cell activation inhibitor, mitochondrial')
})
