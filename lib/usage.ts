type UsageSnapshot = {
  used: number;
  limit: number;
};

export async function getUserUsageSnapshot(userId: string): Promise<UsageSnapshot> {
  void userId;

  return {
    used: 0,
    limit: 100
  };
}

export async function incrementUserGenerationCount(userId: string) {
  void userId;

  return { ok: true };
}
