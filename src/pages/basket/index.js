import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { size } from "lodash";
import { productCtrl } from "@/api";
import { useBasket } from "@/hooks";
import { BasketLayout } from "@/layouts";
import { Loading, NoResult } from "@/components/Shared";
import { Basket } from "@/components/Basket";

export default function BasketPage() {
  const { basket } = useBasket();
  const [products, setProducts] = useState(null);
  const [address, setAddress] = useState(null);
  const {
    query: { step = 1 },
  } = useRouter();
  const currentStep = Number(step);

  useEffect(() => {
    (async () => {
      try {
        const data = [];
        for await (const item of basket) {
          const response = await productCtrl.getById(item.id);
          data.push({ ...response, quantity: item.quantity });
        }
        setProducts(data);
      } catch (error) {
        console.error(error);
      }
    })();
  }, [basket]);

  return (
    <BasketLayout>
      {!products && currentStep !== 4 && <Loading />}

      {products && size(products) === 0 && currentStep < 4 && (
        <NoResult text="Carrito vacio" />
      )}

      {size(products) > 0 && currentStep === 1 && (
        <Basket.StepOne products={products} />
      )}

      {size(products) > 0 && currentStep === 2 && (
        <Basket.StepTwo
          products={products}
          address={address}
          setAddress={setAddress}
          nextDisabled={!address}
        />
      )}

      {size(products) > 0 && currentStep === 3 && (
        <Basket.StepThree products={products} address={address} />
      )}

      {currentStep === 4 && <Basket.StepFour />}
    </BasketLayout>
  );
}
