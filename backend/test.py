from virtual_tellecaller import   generate_output

business_name = "Dominos Pizza"
query = "Tell me about the menu and offers available today."


# response = get_response(business_name,query, rag_data, system_prompt)
res = generate_output(business_name,query)

print(res["response"])
