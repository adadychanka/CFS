export const normilizeIp = (ip: string) => {
  if (ip.startsWith("::ffff:")) {
    return ip.replace("::ffff:", "");
  }

  return ip;
};
