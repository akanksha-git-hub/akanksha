import Oas from 'oas';
import APICore from 'api/dist/core';
import definition from './openapi.json';
class SDK {
    constructor() {
        this.spec = Oas.init(definition);
        this.core = new APICore(this.spec, 'billdesk/2.5 (api/6.1.2)');
    }
    /**
     * Optionally configure various options that the SDK allows.
     *
     * @param config Object of supported SDK options and toggles.
     * @param config.timeout Override the default `fetch` request timeout of 30 seconds. This number
     * should be represented in milliseconds.
     */
    config(config) {
        this.core.setConfig(config);
    }
    /**
     * If the API you're using requires authentication you can supply the required credentials
     * through this method and the library will magically determine how they should be used
     * within your API request.
     *
     * With the exception of OpenID and MutualTLS, it supports all forms of authentication
     * supported by the OpenAPI specification.
     *
     * @example <caption>HTTP Basic auth</caption>
     * sdk.auth('username', 'password');
     *
     * @example <caption>Bearer tokens (HTTP or OAuth 2)</caption>
     * sdk.auth('myBearerToken');
     *
     * @example <caption>API Keys</caption>
     * sdk.auth('myApiKey');
     *
     * @see {@link https://spec.openapis.org/oas/v3.0.3#fixed-fields-22}
     * @see {@link https://spec.openapis.org/oas/v3.1.0#fixed-fields-22}
     * @param values Your auth credentials for the API; can specify up to two strings or numbers.
     */
    auth(...values) {
        this.core.setAuth(...values);
        return this;
    }
    /**
     * If the API you're using offers alternate server URLs, and server variables, you can tell
     * the SDK which one to use with this method. To use it you can supply either one of the
     * server URLs that are contained within the OpenAPI definition (along with any server
     * variables), or you can pass it a fully qualified URL to use (that may or may not exist
     * within the OpenAPI definition).
     *
     * @example <caption>Server URL with server variables</caption>
     * sdk.server('https://{region}.api.example.com/{basePath}', {
     *   name: 'eu',
     *   basePath: 'v14',
     * });
     *
     * @example <caption>Fully qualified server URL</caption>
     * sdk.server('https://eu.api.example.com/v14');
     *
     * @param url Server URL
     * @param variables An object of variables to replace into the server URL.
     */
    server(url, variables = {}) {
        this.core.setServer(url, variables);
    }
    /**
     * This API can be used to initiate a payment or to set up a mandate along with a payment
     * in the BillDesk Hosted Payment Page or BillDesk Web SDK workflow
     *
     * @summary Create Order
     * @throws FetchError<403, types.CreateOrderResponse403> Forbidden
     * @throws FetchError<500, types.CreateOrderResponse500> Internal Server Error
     */
    createOrder(body, metadata) {
        return this.core.fetch('/payments/ve1_2/orders/create', 'post', body, metadata);
    }
    /**
     * Merchant can retrieve the transaction either by using mercid and orderid or
     * transactionid
     *
     * @summary Retrieve Order
     */
    retrieveOrder(body, metadata) {
        return this.core.fetch('/payments/ve1_2/orders/get', 'post', body, metadata);
    }
    /**
     * This API is used to initate the process to Create a Mandate and is applicable for
     * BillDesk Hosted Payments Page and BillDesk Web SDK workflows
     *
     * @summary Create Mandate Token
     * @throws FetchError<403, types.CreateMandateTokenResponse403> Forbidden
     * @throws FetchError<500, types.CreateMandateTokenResponse500> Internal Server Error
     */
    createMandateToken(body, metadata) {
        return this.core.fetch('/pgsi/ve1_2/mandatetokens/create', 'post', body, metadata);
    }
    /**
     * This API is used to either modify certain attributes of an existing mandate or delete a
     * mandate
     *
     * @summary Modify Mandate Token
     */
    modifyMandateToken(body, metadata) {
        return this.core.fetch('/pgsi/ve1_2/mandatetokens/update/create', 'post', body, metadata);
    }
    /**
     * This endpoint creates a new transaction to initiate a charge using a payment method.
     *
     * @summary Create Transaction
     * @throws FetchError<403, types.CreateTransactionResponse403> Forbidden
     * @throws FetchError<500, types.CreateTransactionResponse500> Internal Server Error
     */
    createTransaction(body, metadata) {
        return this.core.fetch('/payments/ve1_2/transactions/create', 'post', body, metadata);
    }
    /**
     * This endpoint authorizes an existing transaction.
     *
     * @summary Update Transaction
     * @throws FetchError<403, types.UpdateTransactionResponse403> Forbidden
     * @throws FetchError<500, types.UpdateTransactionResponse500> Internal Server Error
     */
    updateTransaction(body, metadata) {
        return this.core.fetch('/payments/ve1_2/transactions/update', 'post', body, metadata);
    }
    /**
     * Merchant can retrieve the transaction either by using mercid and orderid or the mercid
     * and the transactionid.
     *
     * @summary Retrieve Transaction
     * @throws FetchError<403, types.PostPaymentsV12TransactionsGetResponse403> Forbidden
     * @throws FetchError<500, types.PostPaymentsV12TransactionsGetResponse500> Internal Server Error
     */
    postPaymentsV1_2TransactionsGet(body, metadata) {
        return this.core.fetch('/payments/ve1_2/transactions/get', 'post', body, metadata);
    }
    /**
     * A refund can be initiated for a transaction using the Create Refund API.
     *
     * Multiple refund requests can be initiated against the same transactionid such that the
     * sum of the refund amounts do not exceed the transaction amount.
     *
     * @summary Create Refund
     * @throws FetchError<403, types.CreateRefundResponse403> Forbidden
     * @throws FetchError<500, types.CreateRefundResponse500> Internal Server Error
     */
    createRefund(body, metadata) {
        return this.core.fetch('/payments/ve1_2/refunds/create', 'post', body, metadata);
    }
    /**
     * Merchant can retrieve refund details either by using mercid and merc_refund_ref_no, or
     * the mercid and refundid.
     *
     * @summary Retrieve Refund
     * @throws FetchError<403, types.RetrieveRefundResponse403> Forbidden
     * @throws FetchError<500, types.RetrieveRefundResponse500> Internal Server Error
     */
    retrieveRefund(body, metadata) {
        return this.core.fetch('/payments/ve1_2/refunds/get', 'post', body, metadata);
    }
    /**
     * This endpoint creates a new authentication request to initiate a charge using a payment
     * method.
     *
     * @summary Create Authentication
     * @throws FetchError<403, types.CreateAuthenticationResponse403> Forbidden
     * @throws FetchError<500, types.CreateAuthenticationResponse500> Internal Server Error
     */
    createAuthentication(body, metadata) {
        return this.core.fetch('/payments/ve1_2/authentications/create', 'post', body, metadata);
    }
    /**
     * Validate Authentication
     *
     * @throws FetchError<403, types.ValidateAuthenticationResponse403> Forbidden
     * @throws FetchError<500, types.ValidateAuthenticationResponse500> Internal Server Error
     */
    validateAuthentication(body, metadata) {
        return this.core.fetch('/payments/ve1_2/authentications/validate', 'post', body, metadata);
    }
    /**
     * This endpoint retrieves the details of a particular authentication using either of
     * `mercid` and `orderid` or `transactionid`.
     *
     * @summary Retrieve Authentication
     * @throws FetchError<403, types.RetrieveAuthenticationResponse403> Forbidden
     * @throws FetchError<500, types.RetrieveAuthenticationResponse500> Internal Server Error
     */
    retrieveAuthentication(body, metadata) {
        return this.core.fetch('/payments/ve1_2/authentications/get', 'post', body, metadata);
    }
}
const createSDK = (() => { return new SDK(); })();
export default createSDK;
