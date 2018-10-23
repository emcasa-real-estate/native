import {ScrollView} from 'react-native'
import {View, Row, Col, Text, Button} from '@emcasa/ui-native'
import IconButton from '@/components/shared/IconButton'
import GhostButton from '@/components/shared/GhostButton'

export default function Neighborhood({value, districts, onChange, onDismiss}) {
  return (
    <View>
      <Row alignItems="flex-start">
        <Col pr={15} mt="5px">
          <IconButton
            onPress={onDismiss}
            name="chevron-left"
            type="light"
            color="white"
            size={20}
          />
        </Col>
        <Col flex={1}>
          <Text color="white">Selecione os bairros desejados</Text>
        </Col>
      </Row>
      <ScrollView style={{height: 200, marginRight: -10, marginTop: 15}}>
        <Button.Group
          strategy="multi"
          onChange={onChange}
          flexDirection="row"
          flexWrap="wrap"
          selectedValue={value}
          renderOption={(option) => (
            <View mb={10} mr={10}>
              {option}
            </View>
          )}
        >
          {districts.map(({name, nameSlug}) => (
            <GhostButton key={nameSlug} value={nameSlug}>
              {name}
            </GhostButton>
          ))}
        </Button.Group>
      </ScrollView>
    </View>
  )
}
