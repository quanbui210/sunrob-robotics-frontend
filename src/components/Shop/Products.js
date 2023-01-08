import ProductItem from './ProductItem';
import classes from './Products.module.css';
import Image2 from '../../assets/robot2.png'
import Image from '../../assets/robottoys.png'
const DUMMY_PRODUCTS = [
  {
    id: 'p1',
    price: 6,
    title: 'Robot1',
    description: 'Suitable for children ages 3 and up, these toys make a great gift for any child interested in robotics and STEM education.',
    image: Image
  },
  {
    id: 'p2',
    price: 5,
    title: 'Robot2',
    description: 'Suitable for children ages 3 and up, these toys make a great gift for any child interested in robotics and STEM education.',
    image: Image2
  },
  {
    id: 'p3',
    price: 5,
    title: 'Robot3',
    description: 'Suitable for children ages 3 and up, these toys make a great gift for any child interested in robotics and STEM education.',
    image: Image
  },
  {
    id: 'p4',
    price: 5,
    title: 'Robot4',
    description: 'Suitable for children ages 3 and up, these toys make a great gift for any child interested in robotics and STEM education.',
    image: Image2
  },
];


const Products = (props) => {
  return (
    <section className={classes.products}>
      <h2 style={{marginBottom: '100px'}}>Our Robot Products</h2>
      <ul>
        {DUMMY_PRODUCTS.map((product) => (
          <ProductItem
          key={product.id}
          title={product.title}
          price={product.price}
          description={product.description}
          id={product.id}
          image={product.image}
        />
        ))}
      </ul>
    </section>
  );
};

export default Products;
