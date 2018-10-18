import {View, Text, Button} from '@emcasa/ui-native'

export default function City({value, onChange}) {
  return (
    <View>
      <Text color="white" fontWeight="bold">
        Você está procurando um imóvel em qual cidade?
      </Text>
      <Button.Group onChange={onChange}>
        <Button value="rj">Rio de Janeiro</Button>
        <Button value="sp">São Paulo</Button>
      </Button.Group>
    </View>
  )
}
