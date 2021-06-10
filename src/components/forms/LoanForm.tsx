import React, { useState } from 'react';
import { Formik, Field, FormikValues } from 'formik';
import { Button, Col, Form, InputGroup } from 'react-bootstrap';
import * as yup from 'yup';
// import {useHistory} from "react-router-dom";

const schema = yup.object().shape({
  fullName: yup.string().required(),
  annualIncome: yup.number().required(),
  propertyAddress: yup.string().required(),
  loanAmount: yup.number().required(),
});

export interface Props {
  cb: (data: any) => void;
}

export default function LoanForm(props: Props) {
  return (
    <Formik
      validationSchema={schema}
      onSubmit={(values, { setSubmitting }) => {
          // on submit, pass values up through callback
        props.cb(values);
      }}
      initialValues={{
        propertyAddress: '',
        fullName: '',
        annualIncome: 0,
        loanAmount: 0,
      }}
    >
      {({
        handleSubmit,
        handleChange,
        handleBlur,
        values,
        touched,
        isValid,
        errors,
      }) => (
        <Form noValidate onSubmit={handleSubmit}>
          <Form.Row>
            <Form.Group as={Col} controlId='fullName'>
              <Form.Label>Full Name</Form.Label>
              <Form.Control
                type='text'
                name='fullName'
                placeholder='Full Name'
                value={values.fullName}
                onChange={handleChange}
                isValid={touched.fullName && !errors.fullName}
                isInvalid={!!errors.fullName}
              />
              <Form.Control.Feedback type='invalid'>
                {errors.fullName}
              </Form.Control.Feedback>
            </Form.Group>
          </Form.Row>
        
          <Form.Row>
            <Form.Group as={Col} controlId='annualIncome'>
              <Form.Label>Annual Income</Form.Label>
              <Form.Control
                type='number'
                name='annualIncome'
                placeholder='1'
                value={values.annualIncome}
                onChange={handleChange}
                isValid={touched.annualIncome && !errors.annualIncome}
                isInvalid={!!errors.annualIncome}
              />
              <Form.Control.Feedback type='invalid'>
                {errors.annualIncome}
              </Form.Control.Feedback>
            </Form.Group>
          </Form.Row>


          <Form.Row>
            <Form.Group as={Col} controlId='propertyAddress'>
              <Form.Label>Property Address</Form.Label>
              <Form.Control
                type='text'
                name='propertyAddress'
                placeholder='Property Address'
                value={values.propertyAddress}
                onChange={handleChange}
                isValid={touched.propertyAddress && !errors.propertyAddress}
                isInvalid={!!errors.propertyAddress}
              />
              <Form.Control.Feedback type='invalid'>
                {errors.propertyAddress}
              </Form.Control.Feedback>
            </Form.Group>
          </Form.Row>

          <Form.Row>
            <Form.Group as={Col} controlId='loanAmount'>
              <Form.Label>Loan Amount</Form.Label>
              <Form.Control
                type='number'
                name='loanAmount'
                placeholder='1'
                value={values.loanAmount}
                onChange={handleChange}
                isValid={touched.loanAmount && !errors.loanAmount}
                isInvalid={!!errors.loanAmount}
              />
              <Form.Control.Feedback type='invalid'>
                {errors.loanAmount}
              </Form.Control.Feedback>
            </Form.Group>
          </Form.Row>

          <Button type='submit'>Submit Loan</Button>
        </Form>
      )}
    </Formik>
  );
}
