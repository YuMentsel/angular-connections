import { Directive, ElementRef, Input, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { selectConversationsList } from '../../redux/selectors/people.selector';
import { Conversation } from '../models/people.model';

@Directive({
  selector: '[appPersonStatus]',
})
export class PersonStatusDirective implements OnInit, OnDestroy {
  @Input('appPersonStatus') id!: string;

  conversations$!: Observable<Conversation[] | null>;

  private conversationsSubscription: Subscription | undefined;

  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2,
    private store: Store,
  ) {}

  ngOnInit(): void {
    this.conversations$ = this.store.select(selectConversationsList);
    this.conversationsSubscription = this.conversations$.subscribe((conversations) => {
      if (this.elementRef && conversations && this.isCompanion(conversations)) {
        this.renderer.addClass(this.elementRef.nativeElement, 'active');
      }
    });
  }

  private isCompanion(conversations: Conversation[]): boolean {
    return conversations.some((conversation) => conversation?.companionID.S === this.id);
  }

  ngOnDestroy(): void {
    if (this.conversationsSubscription) {
      this.conversationsSubscription.unsubscribe();
    }
  }
}
