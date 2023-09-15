import './Form.css'
export default function Form({onSubmit,value,onChange}){
    return(
        <form className='form-group d-flex align-items-center justify-content-center mx-auto mb-4 Form' style={{width:'80%'}} type="search" onSubmit={onSubmit} action="">
        <input placeholder='search' className="form-control form" type="text" value={value} onChange={onChange} />
      </form>
    )
}