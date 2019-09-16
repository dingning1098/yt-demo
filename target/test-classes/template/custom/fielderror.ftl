<@compress single_line = true>
	{"type":"msgbox","mtype": "error", "detail": 
		"<#if fieldErrors??>
			<#list fieldErrors.keySet() as fieldErrorKey>
				<#list fieldErrors[fieldErrorKey] as fieldErrorValue>
					${fieldErrorValue!?html}
				</#list>	
			</#list>
		</#if>"}
</@compress>