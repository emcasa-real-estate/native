import styled from 'styled-components'
import {View, Text, Button} from '@emcasa/ui-native'

import GhostButton from '@/components/shared/GhostButton'

export default function State({value, onChange}) {
  return (
    <View>
      <Text color="white">Você está procurando um imóvel em qual cidade?</Text>
      <Button.Group
        onChange={onChange}
        flexDirection="row"
        flexWrap="wrap"
        selectedValue={value}
        mt={15}
        renderOption={(option) => (
          <View mb={10} mr={10}>
            {option}
          </View>
        )}
      >
        <GhostButton value="rj">Rio de Janeiro</GhostButton>
        <GhostButton value="sp">São Paulo</GhostButton>
      </Button.Group>
    </View>
  )
}
