``` py
def maxVal (x, y):
  return x > y and x or y

print(maxVal(2, 1))

# 求平方根 - 二分法
def findRoot (x, power, epsilon):
  if x < 0 and power % 2 == 0: return
  
  low = min(-1.0, x)
  high = max(1.0, x)

  ans = (high + low) / 2

  while abs(ans ** power - x) > epsilon:
    if ans ** power < x: low = ans
    else: high = ans

    ans = (high + low) / 2
  
  return ans
  

print(findRoot(4, 2, 0.01))

def noop (): return # None #

print(noop())


# 抽象隐藏了细节。它允许我们将一段代码当作黑箱使用

# 抽象的精髓在于，在具体背景之下，保留那些该 保留的，忽略那些该忽略的。
# 在编程中有效使用抽象的关键在于，找到一个对于抽象创建者和抽象潜在使用者都很合适的相关性表示。
# 这才是真正的程序设计艺术。

# 抽象归根结底就是忽略

### 自然数阶乘

def factI (n):
  result = 1
  
  while n > 1:
    result = result * n
    n -= 1
  return result

def factR (n):
  if n == 1:  return n
  else: return n * factR(n - 1)

def factR_2 (n): return n == 1 and n or n * factR_2(n - 1)

factNumber = 5
print(str(factI(factNumber)) + ', ' + str(factR_2(factNumber)))

```