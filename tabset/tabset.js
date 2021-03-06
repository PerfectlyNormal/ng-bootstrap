import { Component, Input, ContentChildren, Directive, TemplateRef, ContentChild, Output, EventEmitter } from '@angular/core';
import { NgbTabsetConfig } from './tabset-config';
var nextId = 0;
/**
 * This directive should be used to wrap tab titles that need to contain HTML markup or other directives.
 */
export var NgbTabTitle = (function () {
    function NgbTabTitle(templateRef) {
        this.templateRef = templateRef;
    }
    NgbTabTitle.decorators = [
        { type: Directive, args: [{ selector: 'template[ngbTabTitle]' },] },
    ];
    /** @nocollapse */
    NgbTabTitle.ctorParameters = function () { return [
        { type: TemplateRef, },
    ]; };
    return NgbTabTitle;
}());
/**
 * This directive must be used to wrap content to be displayed in a tab.
 */
export var NgbTabContent = (function () {
    function NgbTabContent(templateRef) {
        this.templateRef = templateRef;
    }
    NgbTabContent.decorators = [
        { type: Directive, args: [{ selector: 'template[ngbTabContent]' },] },
    ];
    /** @nocollapse */
    NgbTabContent.ctorParameters = function () { return [
        { type: TemplateRef, },
    ]; };
    return NgbTabContent;
}());
/**
 * A directive representing an individual tab.
 */
export var NgbTab = (function () {
    function NgbTab() {
        /**
         * Unique tab identifier. Must be unique for the entire document for proper accessibility support.
         */
        this.id = "ngb-tab-" + nextId++;
        /**
         * Allows toggling disabled state of a given state. Disabled tabs can't be selected.
         */
        this.disabled = false;
    }
    NgbTab.decorators = [
        { type: Directive, args: [{ selector: 'ngb-tab' },] },
    ];
    /** @nocollapse */
    NgbTab.ctorParameters = function () { return []; };
    NgbTab.propDecorators = {
        'id': [{ type: Input },],
        'title': [{ type: Input },],
        'disabled': [{ type: Input },],
        'contentTpl': [{ type: ContentChild, args: [NgbTabContent,] },],
        'titleTpl': [{ type: ContentChild, args: [NgbTabTitle,] },],
    };
    return NgbTab;
}());
/**
 * A component that makes it easy to create tabbed interface.
 */
export var NgbTabset = (function () {
    function NgbTabset(config) {
        /**
         * Whether the closed tabs should be hidden without destroying them
         */
        this.destroyOnHide = true;
        /**
         * A tab change event fired right before the tab selection happens. See NgbTabChangeEvent for payload details
         */
        this.tabChange = new EventEmitter();
        this.type = config.type;
        this.justify = config.justify;
    }
    /**
     * Selects the tab with the given id and shows its associated pane.
     * Any other tab that was previously selected becomes unselected and its associated pane is hidden.
     */
    NgbTabset.prototype.select = function (tabId) {
        var selectedTab = this._getTabById(tabId);
        if (selectedTab && !selectedTab.disabled && this.activeId !== selectedTab.id) {
            var defaultPrevented_1 = false;
            this.tabChange.emit({ activeId: this.activeId, nextId: selectedTab.id, preventDefault: function () { defaultPrevented_1 = true; } });
            if (!defaultPrevented_1) {
                this.activeId = selectedTab.id;
            }
        }
    };
    NgbTabset.prototype.ngAfterContentChecked = function () {
        // auto-correct activeId that might have been set incorrectly as input
        var activeTab = this._getTabById(this.activeId);
        this.activeId = activeTab ? activeTab.id : (this.tabs.length ? this.tabs.first.id : null);
    };
    NgbTabset.prototype._getTabById = function (id) {
        var tabsWithId = this.tabs.filter(function (tab) { return tab.id === id; });
        return tabsWithId.length ? tabsWithId[0] : null;
    };
    NgbTabset.decorators = [
        { type: Component, args: [{
                    selector: 'ngb-tabset',
                    exportAs: 'ngbTabset',
                    template: "\n    <ul [class]=\"'nav nav-' + type + ' justify-content-' + justify\" role=\"tablist\">\n      <li class=\"nav-item\" [class.active]=\"tab.id === activeId\" *ngFor=\"let tab of tabs\">\n        <a [id]=\"tab.id\" class=\"nav-link\" [class.active]=\"tab.id === activeId\" [class.disabled]=\"tab.disabled\"\n          [href]=\"'#' + tab.id\" (click)=\"!!select(tab.id)\" role=\"tab\" [attr.tabindex]=\"(tab.disabled ? '-1': undefined)\"\n          [attr.aria-controls]=\"tab.id + '-panel'\" [attr.aria-expanded]=\"tab.id === activeId\" [attr.aria-disabled]=\"tab.disabled\">\n          {{tab.title}}<template [ngTemplateOutlet]=\"tab.titleTpl?.templateRef\"></template>\n        </a>\n      </li>\n    </ul>\n    <div class=\"tab-content\">\n      <template ngFor let-tab [ngForOf]=\"tabs\">\n        <div\n          class=\"tab-pane {{tab.id === activeId ? 'active' : null}}\"\n          *ngIf=\"!destroyOnHide || tab.id === activeId\"\n          role=\"tabpanel\"\n          [attr.aria-labelledby]=\"tab.id\" id=\"{{tab.id}}-panel\"\n          [attr.aria-expanded]=\"tab.id === activeId\">\n          <template [ngTemplateOutlet]=\"tab.contentTpl.templateRef\"></template>\n        </div>\n      </template>\n    </div>\n  "
                },] },
    ];
    /** @nocollapse */
    NgbTabset.ctorParameters = function () { return [
        { type: NgbTabsetConfig, },
    ]; };
    NgbTabset.propDecorators = {
        'tabs': [{ type: ContentChildren, args: [NgbTab,] },],
        'activeId': [{ type: Input },],
        'destroyOnHide': [{ type: Input },],
        'justify': [{ type: Input },],
        'type': [{ type: Input },],
        'tabChange': [{ type: Output },],
    };
    return NgbTabset;
}());
//# sourceMappingURL=tabset.js.map