import { LogBox } from 'react-native'
import { Checkbox, ICheckboxGroupProps } from 'native-base'

export function CheckedGroup({ ...rest }: ICheckboxGroupProps) {
  LogBox.ignoreLogs([
    'We can not support a function callback. See Github Issues for details https://github.com/adobe/react-spectrum/issues/2320',
  ])
  return (
    <Checkbox.Group {...rest} colorScheme="blue">
      <Checkbox value="boleto" mb={2} mt={3} bg="transparent">
        Boleto
      </Checkbox>
      <Checkbox value="pix" mb={2} bg="transparent">
        Pix
      </Checkbox>
      <Checkbox value="cash" mb={2} bg="transparent">
        Dinheiro
      </Checkbox>
      <Checkbox value="card" mb={2} bg="transparent">
        Cartão de Crédito
      </Checkbox>
      <Checkbox value="deposit" mb={2} bg="transparent">
        Depósito Bancário
      </Checkbox>
    </Checkbox.Group>
  )
}
