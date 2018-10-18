import {View, Text} from '@emcasa/ui-native'

export default function City({value, onChange}) {
  return (
    <View>
      <Text color="white" fontWeight="bold">
        Você está procurando um imóvel em qual cidade?
      </Text>
    </View>
  )
}
