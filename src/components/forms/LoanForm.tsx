import React, { useEffect, useState } from 'react';
import { Formik, Field, FormikValues } from 'formik';
import { Button, Col, Form, InputGroup } from 'react-bootstrap';
import * as yup from 'yup';
import { Permit } from 'utils/types';
// import {useHistory} from "react-router-dom";

const schema = yup.object().shape({
  fullName: yup.string().required(),
  annualIncome: yup.number().required().positive().integer(),
  propertyAddress: yup.string().required(),
  loanAmount: yup.number().required().positive().integer(),
});

export interface Props {
  permits: Permit[];
  cb: (data: any) => void;
}

export default function LoanForm(props: Props) {
  const [permitCount, setPermitCount] = useState(0);

  useEffect(() => {
    setPermitCount(props.permits.length);
    console.log(props.permits);
    console.log(permitCount);
  }, []);

  /**
   * If there are permits that are valid, display their names in the select field
   * @returns options with property addresses OR no properties available
   * TODO this is buggy - sometimes shows properties not available while they exist
   */
  function renderPermitOptions() {
    if (permitsExist()) {
      return Object.values(props.permits).map((permit) => {
        return <option>{permit.propertyAddress}</option>;
      });
    } else {
      return <option disabled={true}>No available properties</option>;
    }
  }

  function permitsExist() {
    return permitCount > 0;
  }

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
        annualIncome: '',
        loanAmount: '',
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
            <Form.Group as={Col} controlId='propertyAddress'>
              <Form.Label>Property Address</Form.Label>
              <Form.Control
                as='select'
                name='propertyAddress'
                placeholder='Property Address'
                value={values.propertyAddress || 'NONE'}
                onChange={handleChange}
                isValid={touched.propertyAddress && !errors.propertyAddress}
                isInvalid={!!errors.propertyAddress}
              >
                <option value={'NONE'} disabled={true}>
                  Select a property
                </option>
                {renderPermitOptions()}
              </Form.Control>
              <Form.Control.Feedback type='invalid'>
                {errors.propertyAddress}
              </Form.Control.Feedback>
            </Form.Group>
          </Form.Row>

          <Form.Row>
            <Form.Group as={Col} controlId='annualIncome'>
              <Form.Label>Annual Income</Form.Label>
              <InputGroup>
                <InputGroup.Prepend>
                  <InputGroup.Text>$</InputGroup.Text>
                </InputGroup.Prepend>
                <Form.Control
                  type='number'
                  name='annualIncome'
                  placeholder='60000'
                  value={values.annualIncome}
                  onChange={handleChange}
                  isValid={touched.annualIncome && !errors.annualIncome}
                  isInvalid={!!errors.annualIncome}
                />
                <Form.Control.Feedback type='invalid'>
                  {errors.annualIncome}
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>

            <Form.Group as={Col} controlId='loanAmount'>
              <Form.Label>Loan Amount</Form.Label>
              <InputGroup>
                <InputGroup.Prepend>
                  <InputGroup.Text>$</InputGroup.Text>
                </InputGroup.Prepend>
                <Form.Control
                  type='number'
                  name='loanAmount'
                  placeholder='500000'
                  value={values.loanAmount}
                  onChange={handleChange}
                  isValid={touched.loanAmount && !errors.loanAmount}
                  isInvalid={!!errors.loanAmount}
                />
                <Form.Control.Feedback type='invalid'>
                  {errors.loanAmount}
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>
          </Form.Row>

          <Button disabled={!permitsExist()} type='submit'>
            Submit Loan Application
          </Button>
        </Form>
      )}
    </Formik>
  );
}
