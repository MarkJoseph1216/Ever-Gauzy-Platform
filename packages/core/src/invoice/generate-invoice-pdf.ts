import {
	IInvoice,
	IOrganization,
	IOrganizationContact,
	InvoiceTypeEnum
} from '@gauzy/contracts';

export async function generateInvoicePdfDefinition(
	invoice: IInvoice,
	organization: IOrganization,
	organizationContact: IOrganizationContact,
	translatedText?: any,
	langulage?: string
) {
	const body = [];
	for (const item of invoice.invoiceItems) {
		const currentItem = [
			`${item.description}`,
			`${item.quantity}`,
			`${invoice.currency} ${item.price}`,
			`${invoice.currency} ${item.totalValue}`
		];
		switch (invoice.invoiceType) {
			case InvoiceTypeEnum.BY_EMPLOYEE_HOURS:
				const employee = item.employee;
				currentItem.unshift(`${employee.user.name}`);
				break;
			case InvoiceTypeEnum.BY_PROJECT_HOURS:
				const project = item.project;
				currentItem.unshift(`${project.name}`);
				break;
			case InvoiceTypeEnum.BY_TASK_HOURS:
				const task = item.task;
				currentItem.unshift(`${task.title}`);
				break;
			case InvoiceTypeEnum.BY_PRODUCTS:
				let product: any = item.product;
				product = product.translate(langulage);
				currentItem.unshift(`${product.name}`);
				break;
			case InvoiceTypeEnum.BY_EXPENSES:
				const expense = item.expense;
				currentItem.unshift(`${expense.purpose}`);
				break;
			default:
				break;
		}
		body.push(currentItem);
	}

	let widths;
	const tableHeader = [
		translatedText.description,
		translatedText.quantity,
		translatedText.price,
		translatedText.totalValue
	];

	if (invoice.invoiceType === InvoiceTypeEnum.DETAILED_ITEMS) {
		widths = ['25%', '25%', '25%', '25%'];
	} else {
		widths = ['20%', '20%', '20%', '20%', '20%'];
		tableHeader.unshift(`${translatedText.item}`);
	}

	const docDefinition = {
		content: [
			{
				columns: [
					{
						width: '*',
						text: `${
							invoice.isEstimate
								? translatedText.estimate
								: translatedText.invoice
						} ${translatedText.number}: ${invoice.invoiceNumber}`
					}
				]
			},
			' ',
			' ',
			{
				columns: [
					{
						width: '50%',
						text: `${translatedText.from}: ${organization.name}`
					},
					{
						width: '50%',
						text: `${translatedText.to}: ${organizationContact.name}`
					}
				]
			},
			' ',
			' ',
			{
				columns: [
					{
						width: '50%',
						text: `${
							invoice.isEstimate
								? translatedText.estimate
								: translatedText.invoice
						} ${
							translatedText.date
						}: ${invoice.invoiceDate.toString().slice(0, 10)}`
					},
					{
						width: '50%',
						text: `${
							translatedText.dueDate
						}: ${invoice.dueDate.toString().slice(0, 10)}`
					}
				]
			},
			' ',
			' ',
			{
				columns: [
					{
						width: '50%',
						text: `${translatedText.discountValue}: ${invoice.discountValue}`
					},
					{
						width: '50%',
						text: `${translatedText.discountType}: ${invoice.discountType}`
					}
				]
			},
			' ',
			' ',
			{
				columns: [
					{
						width: '50%',
						text: `${translatedText.taxValue}: ${invoice.tax}`
					},
					{
						width: '50%',
						text: `${translatedText.taxType}: ${invoice.taxType}`
					}
				]
			},
			' ',
			' ',
			{
				columns: [
					{
						width: '50%',
						text: `${translatedText.totalValue}: ${invoice.currency} ${invoice.totalValue}`
					},
					{
						width: '50%',
						text: `${translatedText.currency}: ${invoice.currency}`
					}
				]
			},
			invoice.hasRemainingAmountInvoiced ? ' ' : '',
			invoice.hasRemainingAmountInvoiced ? ' ' : '',
			{
				columns: invoice.hasRemainingAmountInvoiced
					? [
							{
								width: '50%',
								text: `${translatedText.alreadyPaid}: ${invoice.currency} ${invoice.alreadyPaid}`
							},
							{
								width: '50%',
								text: `${translatedText.amountDue}: ${invoice.currency} ${invoice.amountDue}`
							}
					  ]
					: []
			},
			' ',
			' ',
			`${translatedText.paid}: ${
				invoice.paid ? translatedText.yes : translatedText.no
			}`,
			' ',
			' ',
			`${translatedText.terms}: ${invoice.terms}`,
			' ',
			' ',
			{
				table: {
					widths: widths,
					body: [tableHeader, ...body]
				}
			}
		]
	};
	return docDefinition;
}
