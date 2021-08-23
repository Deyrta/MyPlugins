var Sdk = window.Sdk || {};
(
    function () {

        this.formOnSave = function (executionContext) {
            var eventArgs = executionContext.getEventArgs();
            if (eventArgs.getSaveMode() == 70) {
                eventArgs.preventDefault();
            }
        }

        this.onClickCreatePickupReport = function (executionContext) {

            alert("Its working");
        }
    }


).call(Sdk);