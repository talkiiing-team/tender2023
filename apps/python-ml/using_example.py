import dill

model = dill.load(open("model_bert.pkl", "rb"))
answer = model.forward("реально ли участие поставщика в закупочной процедуре другого региона?")
print(f"Answer: {answer}")
