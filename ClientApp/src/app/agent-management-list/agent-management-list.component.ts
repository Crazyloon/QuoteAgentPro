import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Agent } from '../../data/models/domain/agent';
import { AccountStatus } from '../../data/constants/enumerations/accountStatus';
import { AgentManagementService } from '../agent-management.service';
import { AgentStatusDictionary } from '../../data/models/domain/agentStatusDictionary';
import { PromotionDictionary } from '../../data/models/domain/promotionDictionary';
import { AccessLevel } from '../../data/constants/enumerations/accessLevel';

@Component({
  selector: 'app-agent-management-list',
  templateUrl: './agent-management-list.component.html',
  styleUrls: ['./agent-management-list.component.scss']
})
export class AgentManagementListComponent implements OnInit {
  @Input() agents: Agent[];
  @Output() onAgentsUpdated = new EventEmitter();
  agentStatusDictionary: AgentStatusDictionary = {};
  promotionDictionary: PromotionDictionary = {};
  isOperationSuccessful: boolean = false;
  constructor(private agentManager: AgentManagementService) { }

  ngOnInit() {
  }

  onEnableAgentToggle($event: Event, id: string): void {
    const checkBox: HTMLInputElement = ($event.target || $event.srcElement || $event.currentTarget) as HTMLInputElement;
    checkBox.checked ? this.agentStatusDictionary[id] = AccountStatus.enabled : this.agentStatusDictionary[id] = AccountStatus.disabled;
  }

  onPromoteAgentToggle($event: Event, id: string) {
    const checkBox: HTMLInputElement = ($event.target || $event.srcElement || $event.currentTarget) as HTMLInputElement;
    checkBox.checked ? this.promotionDictionary[id] = AccessLevel.Manager : this.promotionDictionary[id] = AccessLevel.Agent;
  }

  toggleEnableAll() {
    const checkBoxes: NodeListOf<HTMLInputElement> = document.querySelectorAll('.enabled');
    const enabledCheckBoxes: HTMLInputElement[] = Array.from(checkBoxes);
    enabledCheckBoxes.forEach(cb => {
      if (!cb.checked) {
        cb.click();
      }
    });
  }

  approveChanges() {
    // Enable/Disable accounts
    const hasKeys = Object.getOwnPropertyNames(this.agentStatusDictionary).length > 0; // Object.keys(this.accountStatusDictionary).length > 0; 
    if (hasKeys) {
      this.agentManager.setAgentStatusAll(this.agentStatusDictionary).subscribe(success => {
        this.isOperationSuccessful = success === false ? false : true;
        this.agentStatusDictionary = {};
        setTimeout(() => {
          this.isOperationSuccessful = false;
        }, 2000);
      });
    }
    // Promote accounts to manager access
    const hasPromotionKeys = Object.getOwnPropertyNames(this.promotionDictionary).length > 0;
    if (hasPromotionKeys) {
      this.agentManager.setAccessLevel(this.promotionDictionary).subscribe(_ => {
        this.onAgentsUpdated.emit();
        this.promotionDictionary = {};
      });
    }
  }
}
