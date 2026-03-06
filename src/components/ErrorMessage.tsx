export function ErrorMessage(props: any) {
  const { message, details } = props;

  return (
    <div className="w-xl p-3 bg-red-100 text-red-400 rounded-md border border-red-200 mt-2">
      <strong>{message}</strong> {details}
    </div>
  )
}