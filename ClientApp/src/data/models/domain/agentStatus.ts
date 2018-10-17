export class AgentStatus {
  constructor(id: string, enabled: boolean) {
    this.id = id;
    this.enabled = enabled;
  }
  id: string;
  enabled: boolean;
}
