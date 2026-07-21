export const patientRoutingEnabled =
  process.env.ENABLE_PATIENT_ROUTING === "true";

export const pharmacyQuotePartnersEnabled =
  process.env.ENABLE_PHARMACY_QUOTE_PARTNERS === "true";

export const regulatedFlowUnavailable = {
  error:
    "Este fluxo está temporariamente indisponível enquanto revisamos os critérios regulatórios e de privacidade.",
};
