void setup() {
  if (args != null) {
    print("{\"distance\": " + args[0] + "} \t"); // SEPARATE OTHER DATA WITH TABS \t
  } else {
    print("{\"distance\": 0}");
  }
  print("{\"travel\": 50}");
  exit();
}
