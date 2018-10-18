import {View, Row, Col, Text} from '@emcasa/ui-native'
import IconButton from '@/components/shared/IconButton'

export default function Neighborhood({value, onChange, onDismiss}) {
  return (
    <View>
      <Row alignItems="flex-start">
        <Col pr={15} pt={5}>
          <IconButton
            onPress={onDismiss}
            name="chevron-left"
            type="light"
            color="white"
            size={20}
          />
        </Col>
        <Col flex={1}>
          <Text color="white" fontWeight="600">
            Selecione os bairros desejados
          </Text>
        </Col>
      </Row>
    </View>
  )
}
