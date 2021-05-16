import React, { useState } from 'react';
import { Formik, Field, FormikValues } from 'formik';
import { Button, Col, Form, InputGroup } from 'react-bootstrap';
import * as yup from 'yup';
// import {useHistory} from "react-router-dom";

const schema = yup.object().shape({
  propertyAddress: yup.string().required(),
  document: yup.string().required(),
  licenceNumber: yup.string().required(),
});

export interface Props {
  cb: (data: any) => void;
}

export default function PermitForm(props: Props) {
  return (
    <Formik
      validationSchema={schema}
      onSubmit={(values, { setSubmitting }) => {
          // on submit, pass values up through callback
        props.cb(values);
      }}
      initialValues={{
        propertyAddress: '',
        document: '',
        licenceNumber: '',
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
            <Form.Group as={Col} controlId='document'>
              <Form.Label>Document</Form.Label>
              <Form.Control
                type='text'
                name='document'
                placeholder='Document'
                value={values.document}
                onChange={handleChange}
                isValid={touched.document && !errors.document}
                isInvalid={!!errors.document}
              />
              <Form.Control.Feedback type='invalid'>
                {errors.document}
              </Form.Control.Feedback>
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group as={Col} controlId='licenceNumber'>
              <Form.Label>Licence Number</Form.Label>
              <Form.Control
                type='text'
                name='licenceNumber'
                placeholder='Licence Number'
                value={values.licenceNumber}
                onChange={handleChange}
                isValid={touched.licenceNumber && !errors.licenceNumber}
                isInvalid={!!errors.licenceNumber}
              />
              <Form.Control.Feedback type='invalid'>
                {errors.licenceNumber}
              </Form.Control.Feedback>
            </Form.Group>
          </Form.Row>
          <Button type='submit'>Submit Permit</Button>
        </Form>
      )}
    </Formik>
  );
}
