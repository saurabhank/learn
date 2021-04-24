def func():
    #throwing error 
    raise(Exception("custom exception "))

try:
    func()
except Exception as e:
    print("new exception {}".format(e))