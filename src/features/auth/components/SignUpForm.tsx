import { Form } from '@/components/ui/form';
import InputFormField from '@/components/form/InputFormField';
import AuthButton from './AuthButton';
import { useSignUpForm } from '../hooks/useSignUpForm';

const SignUpForm = () => {
  const { form, onSubmit, isPending } = useSignUpForm();
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
        <AuthButton label="Sign Up" isPending={isPending} />
      </form>
    </Form>
  );
};

export default SignUpForm;
