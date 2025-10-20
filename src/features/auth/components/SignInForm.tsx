import { Form} from '@/components/ui/form';
import { useSignInForm } from '../hooks/useLoginForm';
import InputFormField from '@/components/form/InputFormField';
import AuthButton from './AuthButton';

const SignInForm = () => {
  const { form, onSubmit, isPending } = useSignInForm();
  return (
    <Form {...form}>
      <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)} noValidate>
        <InputFormField form={form} name="email" label="Email" placeholder="sample@example.com" maxLength={100} />
        <InputFormField
          form={form}
          name="password"
          label="Password"
          placeholder="********"
          type="password"
          maxLength={20}
        />
        <AuthButton label="Sign In" isPending={isPending} />
      </form>
    </Form>
  );
};

export default SignInForm;
