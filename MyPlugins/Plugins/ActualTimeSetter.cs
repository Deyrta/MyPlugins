using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.ServiceModel;
using Microsoft.Xrm.Sdk;
using MyPlugins.Enums;
using Microsoft.Xrm.Sdk.Query;

namespace MyPlugins.Plugins
{
    public class ActualTimeSetter : IPlugin
    {
        public void Execute(IServiceProvider serviceProvider)
        {
            // Extract the tracing service for use in debugging sandboxed plug-ins.  
            // If you are not registering the plug-in in the sandbox, then you do  
            // not have to add any tracing service related code.  
            ITracingService tracingService =
                (ITracingService)serviceProvider.GetService(typeof(ITracingService));

            // Obtain the execution context from the service provider.  
            IPluginExecutionContext context = (IPluginExecutionContext)
                serviceProvider.GetService(typeof(IPluginExecutionContext));

            // Obtain the organization service reference which you will need for  
            // web service calls.  
            IOrganizationServiceFactory serviceFactory =
                (IOrganizationServiceFactory)serviceProvider.GetService(typeof(IOrganizationServiceFactory));
            IOrganizationService service = serviceFactory.CreateOrganizationService(context.UserId);



            // The InputParameters collection contains all the data passed in the message request.  
            if (context.InputParameters.Contains("Target") &&
                context.InputParameters["Target"] is Entity)
            {
                // Obtain the target entity from the input parameters.  
                var target = ((Entity)context.InputParameters["Target"]).ToEntity<cds_rent>();


                try
                {
                    if (target.cds_Pickupreport != null)
                    {
                        var pickupReport = service.Retrieve("cds_cartransferreport", target.cds_Pickupreport.Id, new ColumnSet("cds_date")).ToEntity<cds_cartransferreport>();
                        target.cds_Actualpickup = pickupReport.cds_Date;
                    }
                    if (target.cds_Returnreport != null)
                    {
                        var returnReport = service.Retrieve("cds_cartransferreport", target.cds_Returnreport.Id, new ColumnSet("cds_date")).ToEntity<cds_cartransferreport>();
                        target.cds_Actualreturn = returnReport.cds_Date; 
                    }
                }

                catch (FaultException<OrganizationServiceFault> ex)
                {
                    throw new InvalidPluginExecutionException("An error occurred in Plug-in.", ex);
                }

                catch (Exception ex)
                {
                    tracingService.Trace("MyPlugin: {0}", ex.ToString());
                    throw;
                }
            }
        }
    }
}
