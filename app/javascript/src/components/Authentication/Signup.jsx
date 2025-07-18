import React, { useEffect, useState } from "react";

import { Toastr } from "@bigbinary/neetoui";
import authApi from "apis/auth";
import SignupForm from "components/Authentication/Form/Signup";

import organizationsApi from "../../apis/organization";
import PageLoader from "../commons/PageLoader";

const Signup = ({ history }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [selectedOrganization, setSelectedOrganization] = useState(null);
  const [organizations, setOrganizations] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchOrganizations = async () => {
      try {
        const response = await organizationsApi.fetch();
        setOrganizations(response.data.organizations);
      } catch (error) {
        logger.error("Failed to fetch organizations", error);
        Toastr.error("Unable to load organizations");
      }
    };

    fetchOrganizations();
  }, []);

  const handleSubmit = async event => {
    event.preventDefault();
    setLoading(true);
    try {
      await authApi.signup({
        name,
        email,
        password,
        password_confirmation: passwordConfirmation,
        organization_id: selectedOrganization?.value,
      });

      Toastr.success("Signup successful! Redirecting to  blogpost...");
      history.push("/");
    } catch (error) {
      logger.error(error);
      Toastr.error("Signup failed. Please check your details and try again.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <PageLoader />;

  return (
    <SignupForm
      handleSubmit={handleSubmit}
      loading={loading}
      organizations={organizations}
      selectedOrganization={selectedOrganization}
      setEmail={setEmail}
      setName={setName}
      setPassword={setPassword}
      setPasswordConfirmation={setPasswordConfirmation}
      setSelectedOrganization={setSelectedOrganization}
    />
  );
};

export default Signup;
