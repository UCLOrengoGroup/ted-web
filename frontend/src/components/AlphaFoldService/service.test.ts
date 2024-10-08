import { expect, test } from 'vitest'

import { convertWebToModel } from './service'

import data_A0A6P4PER7 from './service.test.A0A6P4PER7.json'

test('gets correct UniProt data from A0A6P4PER7', () => {
    expect(data_A0A6P4PER7.uniprot_entry.ac).toBe('A0A6P4PER7')

    const up_data = convertWebToModel(data_A0A6P4PER7)
    expect(up_data.ac).toBe('A0A6P4PER7')
    expect(up_data.id).toBe('A0A6P4PER7_GOSAR')
    expect(up_data.uniprot_checksum).toBe('E5BF4AF471D8B238')
    expect(up_data.sequence_length).toBe(960)
})

