import { Form } from '@/components/ui/form';
import { useSignUpForm } from '../hooks/useLoginForm';
import InputFormField from '@/components/form/InputFormField';
import AuthButton from './AuthButton';

const SignUpForm = () => {
  const { form, onSubmit, isSubmitted } = useSignUpForm();
  return (
    <Form {...form}>
      <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)} noValidate>
        <InputFormField form={form} name="name" label="Name" placeholder="Enter your name" maxLength={100} />
        <InputFormField form={form} name="email" label="Email" placeholder="sample@example.com" maxLength={100} />
        <InputFormField
          form={form}
          name="password"
          label="Password"
          placeholder="********"
          type="password"
          maxLength={20}
        />
        <AuthButton label="Sign Up" isSubmitted={isSubmitted} />
      </form>
    </Form>
  );
};

export default SignUpForm;
