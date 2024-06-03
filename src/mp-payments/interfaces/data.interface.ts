export interface DataPayments {
  results: Result[];
  paging: Paging;
}

export interface Paging {
  total: number;
  limit: number;
  offset: number;
}

export interface ResultsMPObj {
  results: ResultMP[];
  paging: Paging;
}

export interface ResultMP {
  id: number;
  date_approved: Date | null;
  fee_details: FeeDetail[];
  transaction_details: TransactionDetails;
  description: null | string;
  charges_details: ChargesDetail[];
}

export interface Result {
  metadata: ResultMetadata;
  corporation_id: null;
  operation_type: OperationType;
  point_of_interaction: PointOfInteraction | null;
  fee_details: FeeDetail[];
  notification_url: null | string;
  date_approved: Date | null;
  money_release_schema: null;
  transaction_details: TransactionDetails;
  statement_descriptor: null | string;
  call_for_authorize_id: null;
  installments: number;
  pos_id: null;
  external_reference: null | string;
  date_of_expiration: Date | null;
  charges_details: ChargesDetail[];
  id: number;
  payment_type_id: PaymentTypeID;
  payment_method: PaymentMethod;
  order: Order;
  counter_currency: null;
  money_release_status: MoneyReleaseStatus | null;
  brand_id: null;
  status_detail: StatusDetail;
  differential_pricing_id: null;
  additional_info: AdditionalInfo;
  live_mode: boolean;
  payer_id?: number;
  marketplace_owner: null;
  card: Card;
  integrator_id: null;
  status: Status;
  transaction_amount_refunded: number;
  transaction_amount: number;
  description: null | string;
  financing_group: null | string;
  money_release_date: Date | null;
  merchant_number: null;
  collector?: ResultCollector;
  refunds: any[];
  expanded: Expanded;
  authorization_code: null | string;
  captured: boolean;
  merchant_account_id: null;
  taxes_amount: number;
  date_last_updated: Date;
  coupon_amount: number;
  store_id: null;
  build_version: string;
  date_created: Date;
  acquirer_reconciliation: any[];
  sponsor_id: number | null;
  shipping_amount: number;
  issuer_id: string;
  payment_method_id: PaymentMethodID;
  binary_mode: boolean;
  platform_id: null | string;
  deduction_schema: null | string;
  processing_mode: ProcessingMode;
  currency_id: CurrencyID;
  shipping_cost: number;
  tags?: null;
  accounts_info?: null;
  payer?: ResultPayer;
  amounts?: ResultAmounts;
  collector_id?: number;
}

export interface AdditionalInfo {
  authentication_code: null;
  nsu_processadora: null;
  available_balance: null;
  items?: Item[];
  payer?: AdditionalInfoPayer;
  ip_address?: string;
}

export interface Item {
  quantity: string;
  category_id: null | string;
  picture_url: null | string;
  description: null | string;
  id: null | string;
  title: string;
  unit_price: string;
}

export interface AdditionalInfoPayer {
  last_name: string;
  first_name: string;
  phone?: PurplePhone;
}

export interface PurplePhone {
  number: string;
}

export interface ResultAmounts {
  exchange_broker: null;
  payer: AmountsPayer;
  collector: AmountsCollector;
}

export interface AmountsCollector {
  net_received: number;
  transaction_destination: TransactionDestination;
  currency_id: CurrencyID;
  transaction: number;
}

export enum CurrencyID {
  Ars = 'ARS',
}

export interface TransactionDestination {
  fund_partition: string;
  reserve_id: string;
}

export interface AmountsPayer {
  total_paid: number;
  transaction_source: null;
  currency_id: CurrencyID;
  transaction: number;
  transaction_detail: null;
}

export interface Card {
  first_six_digits?: string;
  expiration_year?: number;
  bin?: string;
  date_created?: Date;
  expiration_month?: number;
  id?: null | string;
  cardholder?: Cardholder;
  last_four_digits?: string;
  date_last_updated?: Date;
}

export interface Cardholder {
  identification: Identification;
  name: string;
}

export interface Identification {
  number: null | string;
  type: IdentificationType | null;
}

export enum IdentificationType {
  Cuit = 'CUIT',
  Dni = 'DNI',
  Otro = 'Otro',
}

export interface ChargesDetail {
  refund_charges: any[];
  last_updated: Date;
  metadata: ChargesDetailMetadata;
  amounts: ChargesDetailAmounts;
  date_created: Date;
  name: string;
  reserve_id: number | null;
  accounts: Accounts;
  id: string;
  type: ChargesDetailType;
  client_id: number;
}

export interface Accounts {
  from: FeePayer;
  to: To;
}

export enum FeePayer {
  Collector = 'collector',
  Ml = 'ml',
}

export enum To {
  Me = 'me',
  Ml = 'ml',
  Mp = 'mp',
  Payer = 'payer',
}

export interface ChargesDetailAmounts {
  original: number;
  refunded: number;
}

export interface ChargesDetailMetadata {
  mov_type?: MOVType;
  user_id?: number;
  tax_status?: TaxStatus;
  mov_detail?: MOVDetail;
  mov_financial_entity?: MOVFinancialEntity;
  tax_id?: number;
  shipment_id?: number;
  meli_campaign?: null;
  coupon_id?: number;
  coupon_fee?: null;
  campaign_marketplace?: string;
  campaign_type?: string;
  campaign_id?: number;
  items_group?: string;
}

export enum MOVDetail {
  TaxWithholding = 'tax_withholding',
  TaxWithholdingCollector = 'tax_withholding_collector',
  TaxWithholdingSirtac = 'tax_withholding_sirtac',
}

export enum MOVFinancialEntity {
  BuenosAires = 'buenos_aires',
  Caba = 'caba',
  DebitosCreditos = 'debitos_creditos',
  IibbTucuman = 'iibb_tucuman',
  RetencionGanancias = 'retencion_ganancias',
  RetencionIva = 'retencion_iva',
}

export enum MOVType {
  Expense = 'expense',
}

export enum TaxStatus {
  Applied = 'applied',
}

export enum ChargesDetailType {
  Coupon = 'coupon',
  Fee = 'fee',
  Shipping = 'shipping',
  Tax = 'tax',
}

export interface ResultCollector {
  identification: Identification;
  phone: null;
  operator_id: null;
  last_name: null;
  id: number;
  first_name: null;
  email: null;
}

export interface Expanded {
  gateway: Gateway | null;
  present_meta_data?: string;
}

export interface Gateway {
  buyer_fee: number;
  finance_charge: number;
  date_created: Date;
  merchant: null;
  reference: null | string;
  statement_descriptor: null | string;
  issuer_id: string;
  usn: null | string;
  installments: number;
  soft_descriptor: string;
  authorization_code: string;
  payment_id: number;
  profile_id: string;
  options: string;
  connection: Connection;
  id: string;
  operation: Operation;
}

export enum Connection {
  FirstdataIpg = 'firstdata-ipg',
  Genova = 'genova',
  PrismaIso8583V2 = 'prisma-iso8583-v2',
  VisaAr = 'visa-ar',
}

export enum Operation {
  Authorization = 'authorization',
  Capture = 'capture',
  Purchase = 'purchase',
}

export interface FeeDetail {
  amount: number;
  fee_payer: FeePayer;
  type: FeeDetailType;
}

export enum FeeDetailType {
  ApplicationFee = 'application_fee',
  MercadopagoFee = 'mercadopago_fee',
}

export interface ResultMetadata {
  market?: string;
  country?: string;
  pnr?: string;
  channel?: string;
  taxes?: any[];
  tag?: null;
  vouchers?: any[];
  payer?: MetadataPayer;
  payment_id?: number;
  payment_intention_id?: number;
  official_store_id?: null;
  melipayments?: Melipayments;
}

export interface Melipayments {
  concepts: Concept[];
  encoding: string;
}

export interface Concept {
  detail: string;
  id: string;
  type: string;
}

export interface MetadataPayer {
  address: Address;
  billing_address: Address;
  email: string;
  first_name: string;
  last_name: string;
  national_id: string;
  tax_number_id: string;
}

export interface Address {
  country: string;
}

export enum MoneyReleaseStatus {
  Pending = 'pending',
  Released = 'released',
}

export enum OperationType {
  MoneyTransfer = 'money_transfer',
  RecurringPayment = 'recurring_payment',
  RegularPayment = 'regular_payment',
}

export interface Order {
  id?: string;
  type?: string;
}

export interface ResultPayer {
  entity_type: null;
  identification: Identification;
  phone: FluffyPhone;
  operator_id: null;
  last_name: null;
  id: string;
  type: null;
  first_name: null;
  email: string;
}

export interface FluffyPhone {
  number: null;
  extension: null;
  area_code: null;
}

export interface PaymentMethod {
  id: PaymentMethodID;
  type: PaymentTypeID;
  issuer_id?: string;
  data?: Data;
}

export interface Data {
  retried_by?: string;
  routing_data?: RoutingData;
}

export interface RoutingData {
  merchant_account_id: string;
}

export enum PaymentMethodID {
  AccountMoney = 'account_money',
  Debvisa = 'debvisa',
  Master = 'master',
  Visa = 'visa',
}

export enum PaymentTypeID {
  AccountMoney = 'account_money',
  CreditCard = 'credit_card',
  DebitCard = 'debit_card',
}

export interface PointOfInteraction {
  business_info: BusinessInfo;
  type: PointOfInteractionType;
  transaction_data?: TransactionData;
  location?: Location;
}

export interface BusinessInfo {
  unit: Unit;
  sub_unit: string;
  branch?: null;
}

export enum Unit {
  Cross = 'cross',
  Marketplace = 'marketplace',
  OnlinePayments = 'online_payments',
}

export interface Location {
  source: string;
  state_id: string;
}

export interface TransactionData {
  e2e_id?: null;
  ticket_id?: string;
}

export enum PointOfInteractionType {
  Checkout = 'CHECKOUT',
  Openplatform = 'OPENPLATFORM',
  Unspecified = 'UNSPECIFIED',
}

export enum ProcessingMode {
  Aggregator = 'aggregator',
}

export enum Status {
  Approved = 'approved',
  Cancelled = 'cancelled',
  Rejected = 'rejected',
}

export enum StatusDetail {
  Accredited = 'accredited',
  ByCollector = 'by_collector',
  CcRejectedBadFilledSecurityCode = 'cc_rejected_bad_filled_security_code',
  CcRejectedInsufficientAmount = 'cc_rejected_insufficient_amount',
  CcRejectedOtherReason = 'cc_rejected_other_reason',
}

export interface TransactionDetails {
  total_paid_amount: number;
  acquirer_reference: null;
  installment_amount: number;
  financial_institution: null;
  net_received_amount: number;
  overpaid_amount: number;
  external_resource_url: null;
  payable_deferral_period: null;
  payment_method_reference_id: null | string;
}
