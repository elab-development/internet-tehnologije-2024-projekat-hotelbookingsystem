function FormInput({ label, type = 'text', value, onChange, placeholder, error = '' }) {
  return (
    <div className="form-group">
      {label && <label className="form-label">{label}</label>}
      <input
        type={type}
        className={`form-input ${error ? 'error' : ''}`}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
      {error && <div className="error">{error}</div>}
    </div>
  )
}

export default FormInput
