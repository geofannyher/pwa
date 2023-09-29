import { useFormik } from 'formik'
import './App.css'
import * as yup from 'yup'
import axios from 'axios'
import { useEffect, useState } from 'react'
interface Initdata {
  title: string
  category: string
  price: string
}

function App() {
  const [data, setData] = useState<Initdata[]>([])
  const [page, setpage] = useState(5)

  const getData = async () => {
    try {
      const response = await axios.get(`https://dummyjson.com/products?skip=${page}&limit=5`)
      setData(response.data.products)
    } catch (error) {
      console.log(error)
    }
  }

  const handleBack = () => {
    setpage(page - 1)
    getData()
  }
  const handleNext = () => {
    setpage(page + 1)
    getData()
  }

  useEffect(() => {
    getData()
  }, [])
  
  const formik = useFormik({
    initialValues: {
      file: ""
    }, validationSchema: yup.object({
      file: yup.mixed()
        .required("Required")
        // .test("FILE_SIZE", "Too big", (value) => value && value.size <= 512000)
        // .test("FILE_TYPE", "file must .jpg/png", (value) => value && ['image/png', 'image/jpg'].includes(value.type))
    }), onSubmit: async (values) => {
      console.log(values.file)
      const formData = new FormData()
      try {
        formData.append("file", values.file)
        formData.append("upload_preset", "yymfqai7")
        const response = await axios.post('https://api.cloudinary.com/v1_1/dvzcsxxws/image/upload', formData)
        console.log(response.data)
        alert("success upload")
      } catch (error: any) {
        console.log(error.response.data.error.message)
      }
    }
  })
  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <label htmlFor="">Input File</label>
        {/* <input type="file" onChange={(e) => formik.setFieldValue("file", e.target.files[0])} /> */}
        {
          formik.errors.file && (
            <p>{formik.errors.file}</p>
          )
        }
        <button type='submit'>Submit</button>
      </form>
      <div>
        <table border={1} style={{ color: "white" }}>
          <tr>
            <th>Company</th>
            <th>category</th>
            <th>price</th>
          </tr>
          {
            data ? (
              data.map((element, index) => (
                <tr key={index}>
                  <td>{element.title}</td>
                  <td>{element.category}</td>
                  <td>{element.price}</td>
                </tr>
              ))
            ) : (
              <p>Loading</p>
            )
          }
        </table>
        <button disabled={page === 0} onClick={() => handleBack()}>
          Back
        </button>
        <button onClick={() =>handleNext()}>
          Next
        </button>
      </div>
    </>
  )
}

export default App
