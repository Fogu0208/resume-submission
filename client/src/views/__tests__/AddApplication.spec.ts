import { mount } from '@vue/test-utils'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { createTestingPinia } from '@pinia/testing'
import AddApplication from '../AddApplication.vue'
import { createRouter, createWebHistory } from 'vue-router'

// Mock components that might be used
const router = createRouter({
  history: createWebHistory(),
  routes: [{ path: '/', component: { template: '<div>Home</div>' } }]
})

describe('AddApplication.vue', () => {
  let wrapper: any

  beforeEach(() => {
    wrapper = mount(AddApplication, {
      global: {
        plugins: [
          createTestingPinia({
            createSpy: vi.fn,
          }),
          router
        ]
      }
    })
  })

  it('initializes with empty inputs', () => {
    const companyInput = wrapper.find('input#company')
    const positionInput = wrapper.find('input#position')
    
    // Check if values are empty strings (or initial default values)
    expect(companyInput.element.value).toBe('')
    expect(positionInput.element.value).toBe('')
  })

  it('has autocomplete="off" attribute on form and inputs', () => {
    const form = wrapper.find('form')
    const companyInput = wrapper.find('input#company')
    const positionInput = wrapper.find('input#position')

    expect(form.attributes('autocomplete')).toBe('off')
    expect(companyInput.attributes('autocomplete')).toBe('off')
    expect(positionInput.attributes('autocomplete')).toBe('off')
  })

  it('resets form data on mount', async () => {
    // Manually set some values to simulate "dirty" state if it were kept alive
    // But since we mount a fresh wrapper in beforeEach, this tests the component's initialization logic
    // To test the onMounted reset explicitly, we can check if the ref values match the reset state
    
    // In our implementation, onMounted calls resetForm.
    // Since we can't easily access internal refs without exposing them, 
    // checking the DOM elements (as done in the first test) is the best way.
    
    // Let's verify the default status and date
    const statusSelect = wrapper.find('select#status')
    const dateInput = wrapper.find('input#date')
    
    expect(statusSelect.element.value).toBe('applied')
    expect(dateInput.element.value).toBe(new Date().toISOString().split('T')[0])
  })
})
