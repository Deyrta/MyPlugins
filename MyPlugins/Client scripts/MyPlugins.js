var Sdk = window.Sdk || {};
(

function ()
{
	this.formOnSave = function (executionContext)
	{
		var eventArgs = executionContext.getEventArgs();
		if (eventArgs.getSaveMode() == 70)
		{
			eventArgs.preventDefault();
		}
	}
	this.onClickCreateReturnReport = function (primaryControl)
	{
		var formContext = primaryControl;
		var entityFormOptions = {};
		entityFormOptions["entityName"] = "cds_cartransferreport";
		entityFormOptions["useQuickCreateForm"] = true;
		// Set default values for the Contact form
		var formParameters = {};
		formParameters["cds_type"] = true;
		var currentDate = new Date();
		formParameters["cds_date"] = currentDate;
		// Set lookup column
		//formParameters["preferredsystemuserid"] = "3493e403-fc0c-eb11-a813-002248e258e0"; // ID of the user.
		//formParameters["preferredsystemuseridname"] = " Admin user"; // Name of the user.
		//formParameters["preferredsystemuseridtype"] = "systemuser"; // Table name.
		// End of set lookup column
		// Open the form.
		Xrm.Navigation.openForm(entityFormOptions, formParameters).then(

		function (success)
		{
			var returnReportValue = new Array();
			returnReportValue[0] = new Object();
			returnReportValue[0].id = success.savedEntityReference[0].id;
			returnReportValue[0].name = success.savedEntityReference[0].name;
			returnReportValue[0].entityType = success.savedEntityReference[0].entityType;
			formContext.getAttribute("cds_returnreport").setValue(returnReportValue);
		},

		function (error)
		{
			debugger;
		});
	}
	this.onClickCreatePickupReport = function (primaryControl)
	{
		var formContext = primaryControl;
		var entityFormOptions = {};
		entityFormOptions["entityName"] = "cds_cartransferreport";
		entityFormOptions["useQuickCreateForm"] = true;
		// Set default values for the Contact form
		var formParameters = {};
		formParameters["cds_type"] = false;
		var currentDate = new Date();
		formParameters["cds_date"] = currentDate;
		// Set lookup column
		//formParameters["preferredsystemuserid"] = "3493e403-fc0c-eb11-a813-002248e258e0"; // ID of the user.
		//formParameters["preferredsystemuseridname"] = " Admin user"; // Name of the user.
		//formParameters["preferredsystemuseridtype"] = "systemuser"; // Table name.
		// End of set lookup column
		// Open the form.
		Xrm.Navigation.openForm(entityFormOptions, formParameters).then(

		function (success)
		{
			var pickupReportValue = new Array();
			pickupReportValue[0] = new Object();
			pickupReportValue[0].id = success.savedEntityReference[0].id;
			pickupReportValue[0].name = success.savedEntityReference[0].name;
			pickupReportValue[0].entityType = success.savedEntityReference[0].entityType;
			formContext.getAttribute("cds_pickupreport").setValue(pickupReportValue);
		},

		function (error)
		{
			debugger;
		});
	}
	this.hideCreatePickupReportButton = function (executionContext)
	{
		if (Xrm.Page.getAttribute("cds_pickupreport").getValue() == null)
		{
			return true;
		}
		else return false;
	}
	this.hideCreateReturnReportButton = function (executionContext)
	{
		if (Xrm.Page.getAttribute("cds_returnreport").getValue() == null)
		{
			return true;
		}
		else return false;
	}
}).call(Sdk);
