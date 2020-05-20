import React from "react";
import { useForm } from "react-hook-form";
import "./Shipment.css";
import { useAuth } from "../../use.auth";
const Shipment = () => {

  const { register, handleSubmit, errors } = useForm();
  const onSubmit = data => console.log(data);
  const auth = useAuth();
  //console.log(auth.user);
  return (
    < form onSubmit={handleSubmit(onSubmit)} className="ship-form">

      < input name="Name" defaultValue={auth.user && auth.user.name} placeholder="Name" ref={register({ required: true })} />
      {errors.Name && <span>Name is required</span>}

      < input name="Email" defaultValue={auth.user && auth.user.email} placeholder="E-mail" ref={register({ required: true })} />
      {errors.Email && <span>Email is required</span>}
      < input name="ADDRESS1" placeholder="Address" ref={register({ required: true })} />
      {errors.ADDRESS1 && <span>ADDRESS is required</span>}
      < input name="Address2" placeholder="Extra Address" ref={register} />
      <br />
      < input name="City" placeholder="City" ref={register({ required: true })} />
      {errors.City && <span>City is required</span>}
      < input name="Country" placeholder="Country" ref={register({ required: true })} />
      {errors.Country && <span>Country is required</span>}
      < input name="ZipCode" placeholder="Zip Code" ref={register({ required: true })} />
      {errors.ZipCode && <span>ZipCode is required</span>}
      <input type="submit" id="btn" />

    </form >
  );
};
export default Shipment;