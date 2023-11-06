import { Form, Col, Row } from "react-bootstrap"
import { useState, useCallback, useEffect} from "react"
import { productActions } from "../../../store/product-slice";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router";
import './Form.css'
export default function AddProductForm ({mode}) {
    const dispatch = useDispatch()
    const { id } = useParams()
    const cloudImgUrl = useSelector(state => state.product.imageUrl)
    console.log(cloudImgUrl)
    const navigate = useNavigate()
    const fetchedProduct = useSelector(state => state.product.product)
    const [formData, setFormData] = useState({
        name: "",
        quantity: 0,
        price: 0,
        description: "",
        category: 'education',
        status: "Available",
        freeShipping: true,
        imageUrl:""
    });
    const [image, setImage] = useState('')
    const [currentImageUrl, setCurrentImageUrl] = useState(cloudImgUrl)
    useEffect(() => {
        if (mode === "edit" && id) {
            dispatch(productActions.getOneProdut(id))
            setFormData({
                name: fetchedProduct.name,
                quantity: fetchedProduct.quantity,
                price: fetchedProduct.price,
                description: fetchedProduct.description,
                category: fetchedProduct.category,
                status: fetchedProduct.status,
                freeShipping: fetchedProduct.freeShipping,
                imageUrl: fetchedProduct.image
            })
        }
    }, [id, mode, dispatch])



      const handleInputChange = useCallback((e) => {
        const { name, value } = e.target
        setFormData((prevState) => ({ ...prevState, [name]: value }))
      }, [])

    useEffect(() => {
        console.log("currentImageUrl updated:", currentImageUrl);
    }, [currentImageUrl]);



      const handleUpload = async() =>{
        if (image) {
            const formDataImage = new FormData();
            await formDataImage.append('image', image);
            await dispatch(productActions.uploadImage(formDataImage));
            setCurrentImageUrl(cloudImgUrl)

        }
      }

      const handleSubmit = async (e) => {
        e.preventDefault()
        if(mode === 'edit') {
            formData.imageUrl = cloudImgUrl
        }
        const newProduct = {
            name: formData.name,
            quantity: formData.quantity,
            price: formData.price,
            description: formData.description,
            category: formData.category,
            status: formData.status,
            freeShipping: formData.freeShipping === 'True' ? true : false,
            image: cloudImgUrl
        }
        if (mode === 'edit') {
            console.log(newProduct, id);
            await dispatch(productActions.editProduct({id, product: newProduct}))
        } else {
            await dispatch(productActions.addProduct(newProduct))
            console.log('add');
        }
        navigate('/products')
      }
 
    return(
        <div className="form-container-dashboard">
            <h2>{mode==='edit' ? 'Edit product' :'Add new product' }</h2>
            <Form onSubmit={handleSubmit}>
                <Form.Group as={Col} className="form-group-dashboard" >
                    <Form.Label className="add-label">Name</Form.Label>
                    <Form.Control 
                    value={formData.name} 
                    onChange={handleInputChange} 
                    className="add-input" type="text" 
                    placeholder="Name" 
                    name="name"/>
                </Form.Group>
                <Form.Group className="mb-3 form-group-dashboard" >
                    <Form.Label className="add-label">Quantity</Form.Label>
                    <Form.Control
                    value={formData.quantity} 
                    onChange={handleInputChange} 
                    className="add-input"
                    type="number"
                    placeholder="Quantity" 
                    name="quantity"
                    />
                </Form.Group>
                <Form.Group className="mb-3 form-group-dashboard">
                    <Form.Label className="add-label">Price</Form.Label>
                    <Form.Control 
                    value={formData.price} 
                    onChange={handleInputChange}
                    name="price"
                    className="add-input" type="number" placeholder="Price" />
                </Form.Group>
                <Form.Group className="mb-3 form-group" >
                    <Form.Label className="add-label">Description</Form.Label>
                    <textarea 
                    value={formData.description} 
                    name="description"
                    rows={3}
                    cols="100"
                    onChange={handleInputChange} 
                    className="desc-input" />
                </Form.Group>
                <Form.Group className="form-group-dashboard">
                    <Form.Label className="add-label">Image</Form.Label>
                    <input 
                    type="file" 
                    id='product-file' 
                    accept="image/png, 
                    image/jpeg, image/jpg"
                    className="file-input"
                    onChange={(e) => setImage(e.target.files[0])}>
                    
                    </input>
                </Form.Group>
                    <button className="confirm-img-btn" onClick={handleUpload} type="button">Confirm image?</button>
                <div className="select-group">
                <Form.Group className="select-form">
                    <Form.Label className="add-label">Category</Form.Label>
                    <Form.Select value={formData.category} onChange={handleInputChange} name="category" size="sm" aria-label="category selection" className="select-input">
                        <option value="programmable">programmable</option>
                        <option value="non-programmable">non-programmable</option>
                        <option value="education">education</option>
                    </Form.Select>
                </Form.Group>
                <Form.Group className="select-form">
                    <Form.Label className="add-label">Status</Form.Label>
                    <Form.Select value={formData.status} onChange={handleInputChange} name="status" size="lg" aria-label="status selection" className="select-input">
                        <option value="available">Available</option>
                        <option value="Out of stock">Out of stock</option>
                    </Form.Select>
                </Form.Group>
                <Form.Group className="select-form">
                    <Form.Label className="add-label">Shipping</Form.Label>
                    <Form.Select value={formData.freeShipping} onChange={handleInputChange} name="freeShipping" size="sm" aria-label="shipping" className="select-input">
                        <option value={false}>True</option>
                        <option value={false}>False</option>
                    </Form.Select>
                </Form.Group>
                </div>    
                <button className="submit-btn">Submit</button>
            </Form>
        </div>
    )
}