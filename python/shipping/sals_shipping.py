premium_ground_shipping = 125

def ground_shipping(weight):
  if weight > 10:
    cost = weight * 4.75
  elif weight > 6:
    cost = weight * 4
  elif weight > 2:
    cost = weight * 3
  else:
    cost = weight * 1.5
  return cost + 20

print(ground_shipping(8.4))

def drone_shipping(weight):
  if weight > 10:
    cost = weight * 14.25
  elif weight > 6:
    cost = weight * 12
  elif weight > 2:
    cost = weight * 9
  else:
    cost = weight * 4.5
  return cost

print(drone_shipping(1.5))

def cheapest_shipping(weight):
  if premium_ground_shipping < ground_shipping(weight) < drone_shipping(weight):
    return 'You should ship using premimum ground shipping, it will cost $125.00'
  elif drone_shipping(weight) < ground_shipping(weight):
    return f"You should ship using drone shipping, it will cost ${drone_shipping(weight)}"
  else:
    return f"You should ship using ground shipping, it will cost ${ground_shipping(weight)}"

print(cheapest_shipping(5))
