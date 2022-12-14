import { Button, Flex, Stack } from '@chakra-ui/react'
import { FieldValue, FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import { Input } from '../components/Form/Input'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

type SignInFormData = {
  email: string,
  password: string,
}

const signInFormSchema = yup.object().shape({
  email: yup.string().required('E-mail obrigatório').email('E-mail invalido'),
  password: yup.string().required('Senha obrigatória')
})

export default function SignIn() {
  const { register, handleSubmit, formState, formState: { errors } } = useForm<SignInFormData>({
    resolver: yupResolver(signInFormSchema)
  })

  const handleSignIn: SubmitHandler<FieldValues> = async (values) => {
    await new Promise(resolve => setTimeout(resolve, 2000))

    console.log(values)
  }

  return (
    <Flex 
      w='100vw' 
      h='100vh' 
      align='center' 
      justify='center'>
      <Flex 
        as='form' 
        w='100%' 
        maxWidth='360px' 
        bg='gray.800' 
        p='8' 
        borderRadius='8' 
        flexDir='column'
        onSubmit={handleSubmit(handleSignIn)}
        >
        <Stack spacing='4'>
            <Input 
              type='email' 
              label='E-mail' 
              error={errors.email}
              {...register("email")}
            />
            <Input 
              type='password' 
              error={errors.password} 
              label='Senha' 
              {...register('password')}
            />
        </Stack>

        <Button 
        type='submit' 
        mt='6' 
        colorScheme='pink' 
        size='lg' 
        isLoading={formState.isSubmitting}
        >
          Entrar
        </Button>
      </Flex>
    </Flex>
  )
}


