import React from 'react';
import { Formik, Form, Field,ErrorMessage } from 'formik';
import * as Yup from 'yup';
import './SignUp.css';

const SignUp = () => {
  // Define validation schema using Yup
  // const validationSchema = Yup.object().shape({
  //   fullName: Yup.string()
  //     .max(30, 'Must be 30 characters or less')
  //     .test('lowercase', 'Full name must be lowercase', 
  //     function(value) {
  //       return value === value.toLowerCase();
  //     })
  //     .required('Only lowercase for the Name field and the character limit is 30'),
  const validationSchema = Yup.object().shape({
    fullName: Yup.string()
      .max(30, 'Must be 30 characters or less')
      .matches(
        /^[A-Z][a-zA-Z\s]*$/,
        'Full name must start with a capital letter'
      )
      .required('Full name is required'),
      // .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>]).*$/, 
      //   'Full name must contain at least one special character and one uppercase letter')
      // .required(),
    
      email: Yup.string()
      .email('Invalid email address')
      .test('lowercase', 'Email address must be lowercase', 
      function(value) {
        return value === value.toLowerCase();
      })
      .required(' Email address should only be lower case'),
    
      password: Yup.string()
      .min(12, 'Password must be at least 12 characters')
      .max(18, 'Password must be at most 18 characters')
      .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>]).*$/,'Passwrod can be combination of upper , lower case, numbers and special characters. The charcter limit is 18')
      .required(),
      
      companyName: Yup.string()
      .max(100, 'Must be 100 characters or less')
      .test(
        'lowerUppercase',
        'Company name must be a combination of lower and upper case',
        function(value) {
          return /[a-z]/.test(value) && /[A-Z]/.test(value);
        }
      )
      .required('Company name can be combination of lower & Upper case and the Character limit is 100.'),
  });
  
  const handleSubmit = (values, { setSubmitting }) => {
    // Handle submission logic here
    console.log(values);
    setSubmitting(false);
  };

  return (
    <div className="signup-container">
      <Formik
        initialValues={{
          fullName: '',
          email: '',
          password: '',
          companyName: '',
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <h1>Register</h1>
            <div>
              Full name
              <Field
                type="text"
                name="fullName"
                placeholder="First name and last name"
              />
              <ErrorMessage name="fullName" component="div" className="error" />
            </div>
           <div>
              Work email
              <Field
                type="email"
                name="email"
                placeholder="youremail@company.com"
              />
              <ErrorMessage name="email" component="div" className="error" />
            </div>
            <div>
              Password
              <Field
                type="password"
                name="password"
                placeholder="At least 12 characters"
                />
                <ErrorMessage name="password" component="div" className="error" />
            </div>
               <div>
              Company name
              <Field
                type="text"
                name="companyName"
                placeholder="Your company name"
              />
              <ErrorMessage name="companyName" component="div" className="error" />
            </div>
              
            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Submitting...' : 'Sign up'}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default SignUp;
