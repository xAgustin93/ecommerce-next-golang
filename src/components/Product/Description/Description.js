export function Description(props) {
  const { product } = props;

  return (
    <div>
      <div dangerouslySetInnerHTML={{ __html: product.prodDescription }} />
    </div>
  );
}
