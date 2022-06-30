 import ErrorMessage from '../error-msg/error-msg'
 
 const Controls = ({label,name,value,handleChange,errorMessage}) => {
    return <div className="w-full text-left px-3 mb-6">
    <label data-testid='label' className="block tracking-wide text-gray-700 text-xs font-bold mb-2">
      {label}
    </label>
    <input
      data-testid={`control`}
      className="appearance-none block w-full text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
      type="text"
      name={name}
      value={value}
      onChange={handleChange}
      title={name}
    />
    {errorMessage && <ErrorMessage msg={errorMessage}/>}
  </div>
}
export default Controls;