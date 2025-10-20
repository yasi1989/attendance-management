type SeparatorInMessageProps = {
  message: string;
};

const SeparatorInMessage = ({ message }: SeparatorInMessageProps) => {
  return (
    <div className="relative my-4">
      <div className="absolute inset-0 flex items-center">
        <span className="w-full border-t" />
      </div>
      <div className="relative flex justify-center text-xs">
        <span className="bg-background px-2 text-muted-foreground">{message}</span>
      </div>
    </div>
  );
};

export default SeparatorInMessage;
