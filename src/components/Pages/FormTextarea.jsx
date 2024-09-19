/* eslint-disable react/prop-types */
const FormTextarea = ({
  label,
  type = "text",
  name,
  register,
  errors,
  isRequired,
}) => {
  return (
    <div className="mb-4">
      <label className="block text-gray-700">{label}</label>
      <textarea
        type={type}
        placeholder="typing..."
        {...register(name, {
          required: isRequired ? `${label} is required` : false,
        })}
        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-[#28D08A] focus:border-[#28D08A]"
      />
      {errors[name] && <p className="text-red-500">{errors[name].message}</p>}
    </div>
  );
};

export default FormTextarea;
